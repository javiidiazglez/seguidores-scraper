#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');

const packageJson = require(path.join(__dirname, '..', 'package.json'));
const version = packageJson.version;
const tag = `v${version}`;
const repo = process.env.GITHUB_REPOSITORY || 'owner/seguidores-scraper';

const SECTIONS = [
    { key: 'feat', title: 'Features' },
    { key: 'fix', title: 'Fixes' },
    { key: 'docs', title: 'Documentation' },
    { key: 'refactor', title: 'Refactoring' },
    { key: 'style', title: 'Style' },
    { key: 'ci', title: 'CI' },
    { key: 'chore', title: 'Maintenance' },
    { key: 'other', title: 'Other changes' },
];

function run(command) {
    return execSync(command, { encoding: 'utf8' }).trim();
}

function getPreviousTag() {
    const tags = run('git tag -l "v*" --sort=-v:refname')
        .split('\n')
        .filter(Boolean);

    return tags.find(item => item !== tag) || null;
}

function getCommits(previousTag) {
    const range = previousTag ? `${previousTag}..HEAD` : 'HEAD';
    const log = run(`git log ${range} --pretty=format:%s`);

    if (!log) {
        return [];
    }

    return log.split('\n').filter(Boolean);
}

function cleanDescription(description) {
    return description
        .replace(/^v?\d+\.\d+\.\d+\s*/i, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function parseSubject(subject) {
    const conventional = subject.match(/^(feat|fix|docs|chore|ci|refactor|style)(\([^)]+\))?:\s*(.*)$/i);

    if (conventional) {
        return {
            type: conventional[1].toLowerCase(),
            description: cleanDescription(conventional[3]) || subject,
        };
    }

    const legacyVersion = subject.match(/^v?\d+\.\d+\.\d+\s+(.*)$/i);
    if (legacyVersion) {
        return {
            type: 'other',
            description: cleanDescription(legacyVersion[1]) || subject,
        };
    }

    return {
        type: 'other',
        description: cleanDescription(subject) || subject,
    };
}

function buildSummary(commits) {
    const preferred = commits.find(item => item.type === 'feat' || item.type === 'fix');
    const pick = preferred || commits[0];

    if (!pick) {
        return `Release **seguidores-scraper ${tag}** — GitHub Pages update.`;
    }

    const label = pick.type === 'feat' ? 'Feature' : pick.type === 'fix' ? 'Fix' : 'Update';
    return `Release **seguidores-scraper ${tag}** — ${label}: ${pick.description}.`;
}

function buildBody(commits, previousTag) {
    const grouped = Object.fromEntries(SECTIONS.map(section => [section.key, []]));

    for (const subject of commits) {
        const parsed = parseSubject(subject);
        const bucket = grouped[parsed.type] ? parsed.type : 'other';
        grouped[bucket].push(parsed.description);
    }

    const lines = [buildSummary(commits.map(subject => parseSubject(subject))), ''];

    for (const section of SECTIONS) {
        const items = grouped[section.key];
        if (!items.length) {
            continue;
        }

        lines.push(`### ${section.title}`, '');
        for (const item of items) {
            lines.push(`- ${item}`);
        }
        lines.push('');
    }

    const compareBase = previousTag || tag;
    lines.push(
        '---',
        '',
        `**Full Changelog**: https://github.com/${repo}/compare/${compareBase}...${tag}`,
        ''
    );

    return lines.join('\n').trimEnd() + '\n';
}

function main() {
    const previousTag = getPreviousTag();
    const commits = getCommits(previousTag);
    const body = buildBody(commits, previousTag);

    process.stdout.write(body);
}

main();
