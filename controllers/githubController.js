const axios = require("axios");
const { GITHUB_API_BASE, GITHUB_TOKEN, GITHUB_USERNAME } = require("../config/githubConfig");

const githubHeaders = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json"
};

exports.getGitHubProfile = async (req, res) => {
  try {
    const { data } = await axios.get(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, { headers: githubHeaders });
    res.json({
      username: data.login,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      repos_url: data.repos_url
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
};

exports.getRepoDetails = async (req, res) => {
  try {
    const repoName = req.params.repo;
    const { data } = await axios.get(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`, { headers: githubHeaders });
    res.json({
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      open_issues: data.open_issues_count
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repository details" });
  }
};

exports.createGitHubIssue = async (req, res) => {
  try {
    const { title, body } = req.body;
    const repoName = req.params.repo;

    const { data } = await axios.post(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      { headers: githubHeaders }
    );

    res.json({ message: "Issue created", issue_url: data.html_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to create issue" });
  }
};
