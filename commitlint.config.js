module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'jira-task-id-max-length': [2, 'always', 11],
    'jira-task-id-project-key': [2, 'always', ['NOJIRA', 'FIS']],
    'header-full-stop': [2, 'always', '.'],
  },
};
