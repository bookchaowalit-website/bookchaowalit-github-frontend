import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let requestId: number | string = 0;

  try {
    const body = await request.json();
    const { method, params } = body;

    let result;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: 'GitHub Activity Showcase',
            version: '1.0.0',
            description: 'GitHub activity tracker and repository viewer'
          }
        };
        break;

      case 'tools/list':
        result = {
          tools: [
            {
              name: 'get_repos',
              description: 'Get list of GitHub repositories for a user',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'GitHub username' },
                  sort: { type: 'string', enum: ['updated', 'created', 'pushed', 'full_name'], description: 'Sort field' },
                  per_page: { type: 'number', description: 'Results per page (max 100)' }
                },
                required: ['username']
              }
            },
            {
              name: 'get_commits',
              description: 'Get commit history for a repository',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'GitHub username' },
                  repo: { type: 'string', description: 'Repository name' },
                  branch: { type: 'string', description: 'Branch name (default: main)' },
                  per_page: { type: 'number', description: 'Results per page (max 100)' }
                },
                required: ['username', 'repo']
              }
            },
            {
              name: 'get_languages',
              description: 'Get programming languages used across repositories',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'GitHub username' }
                },
                required: ['username']
              }
            },
            {
              name: 'get_pull_requests',
              description: 'Get pull requests for a repository',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'GitHub username' },
                  repo: { type: 'string', description: 'Repository name' },
                  state: { type: 'string', enum: ['open', 'closed', 'all'], description: 'PR state' },
                  per_page: { type: 'number', description: 'Results per page (max 100)' }
                },
                required: ['username', 'repo']
              }
            }
          ]
        };
        break;

      case 'tools/call':
        const toolName = params?.name;

        switch (toolName) {
          case 'get_repos':
            const username = params?.arguments?.username;
            if (!username) throw new Error('Username is required');
            result = await getRepos(username, params?.arguments?.sort, params?.arguments?.per_page);
            break;

          case 'get_commits':
            const repoUsername = params?.arguments?.username;
            const repo = params?.arguments?.repo;
            if (!repoUsername || !repo) throw new Error('Username and repo are required');
            result = await getCommits(repoUsername, repo, params?.arguments?.branch, params?.arguments?.per_page);
            break;

          case 'get_languages':
            const langUsername = params?.arguments?.username;
            if (!langUsername) throw new Error('Username is required');
            result = await getLanguages(langUsername);
            break;

          case 'get_pull_requests':
            const prUsername = params?.arguments?.username;
            const prRepo = params?.arguments?.repo;
            if (!prUsername || !prRepo) throw new Error('Username and repo are required');
            result = await getPullRequests(prUsername, prRepo, params?.arguments?.state, params?.arguments?.per_page);
            break;

          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId,
      result
    });

  } catch (error) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId || 1,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error
      }
    }, { status: 500 });
  }
}

async function getRepos(username: string, sort?: string, per_page?: number) {
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  if (sort) url.searchParams.set('sort', sort);
  if (per_page) url.searchParams.set('per_page', per_page.toString());

  const response = await fetch(url.toString(), {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const repos = await response.json();

  return {
    username,
    count: repos.length,
    repositories: repos.map((r: any) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.updated_at,
      url: r.html_url
    }))
  };
}

async function getCommits(username: string, repo: string, branch?: string, per_page?: number) {
  const url = new URL(`https://api.github.com/repos/${username}/${repo}/commits`);
  if (branch) url.searchParams.set('sha', branch);
  if (per_page) url.searchParams.set('per_page', per_page.toString());

  const response = await fetch(url.toString(), {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const commits = await response.json();

  return {
    username,
    repo,
    branch: branch || 'main',
    count: commits.length,
    commits: commits.map((c: any) => ({
      sha: c.sha,
      message: c.commit?.message,
      author: c.commit?.author?.name,
      date: c.commit?.author?.date,
      url: c.html_url
    }))
  };
}

async function getLanguages(username: string) {
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  url.searchParams.set('per_page', '100');

  const response = await fetch(url.toString(), {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const repos = await response.json();
  const languages: Record<string, number> = {};

  repos.forEach((r: any) => {
    if (r.language) {
      languages[r.language] = (languages[r.language] || 0) + 1;
    }
  });

  return {
    username,
    languages: Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ language: name, repositories: count }))
  };
}

async function getPullRequests(username: string, repo: string, state?: string, per_page?: number) {
  const url = new URL(`https://api.github.com/repos/${username}/${repo}/pulls`);
  if (state) url.searchParams.set('state', state);
  if (per_page) url.searchParams.set('per_page', per_page.toString());

  const response = await fetch(url.toString(), {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const prs = await response.json();

  return {
    username,
    repo,
    state: state || 'open',
    count: prs.length,
    pull_requests: prs.map((pr: any) => ({
      number: pr.number,
      title: pr.title,
      author: pr.user?.login,
      state: pr.state,
      created: pr.created_at,
      updated: pr.updated_at,
      url: pr.html_url
    }))
  };
}
