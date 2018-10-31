module.exports = {
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        publishCmd:
          './node_modules/.bin/lerna publish --conventional-commits --yes --message "chore(release): %s [skip ci]\n\n${nextRelease.notes}"', // eslint-disable-line
      },
    ],
    '@semantic-release/github',
  ],
};
