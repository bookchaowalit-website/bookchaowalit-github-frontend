import { Github, GitCommit, GitPullRequest, Code2 } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      name: 'get_repos',
      description: 'Get list of GitHub repositories',
      icon: Github,
      params: ['username', 'sort (optional)', 'per_page (optional)']
    },
    {
      name: 'get_commits',
      description: 'Get commit history for a repository',
      icon: GitCommit,
      params: ['username', 'repo', 'branch (optional)', 'per_page (optional)']
    },
    {
      name: 'get_languages',
      description: 'Get programming languages used in repositories',
      icon: Code2,
      params: ['username']
    },
    {
      name: 'get_pull_requests',
      description: 'Get pull requests for a repository',
      icon: GitPullRequest,
      params: ['username', 'repo', 'state (optional)', 'per_page (optional)']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-gray-800">
              <Github className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GitHub Activity Showcase</h1>
              <p className="text-sm text-slate-400">Track and Display GitHub Contributions</p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-500/30 bg-gray-500/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
            <span className="text-sm text-gray-300">MCP-Enabled Server</span>
          </div>

          <h2 className="mb-6 text-5xl font-bold text-white">
            Your GitHub Activity
          </h2>

          <p className="mb-8 text-lg text-slate-300">
            Showcase your GitHub contributions, repositories, commits, and pull requests.
            This MCP-enabled server provides easy access to your public GitHub activity data.
          </p>

          <a
            href="/api/mcp"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 px-6 py-3 font-medium text-white transition-all hover:from-gray-700 hover:to-gray-900"
          >
            <Github className="h-4 w-4" />
            MCP Endpoint
          </a>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="mb-10 text-center">
          <h3 className="mb-4 text-3xl font-bold text-white">Available MCP Tools</h3>
          <p className="text-slate-400">
            Access GitHub data through these MCP endpoints
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm transition-all hover:border-gray-500/50 hover:bg-slate-800/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600/20 to-gray-800/20 group-hover:from-gray-600/30 group-hover:to-gray-800/30">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>

                <h4 className="mb-2 font-semibold text-white">{tool.name}</h4>
                <p className="mb-4 text-sm text-slate-400">{tool.description}</p>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Parameters:</p>
                  {tool.params.map((param) => (
                    <code
                      key={param}
                      className="block rounded bg-slate-900/50 px-2 py-1 text-xs text-gray-300"
                    >
                      {param}
                    </code>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-700/50">
        <div className="container mx-auto px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-2xl font-bold text-white">Features</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="flex items-start gap-3">
                <Github className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Public Data Access</h4>
                  <p className="text-sm text-slate-400">No authentication needed for public repositories</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GitCommit className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Commit History</h4>
                  <p className="text-sm text-slate-400">Track code changes across all repositories</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Language Statistics</h4>
                  <p className="text-sm text-slate-400">Show programming languages you use</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GitPullRequest className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Pull Request Tracking</h4>
                  <p className="text-sm text-slate-400">Monitor open and closed PRs</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-700/50">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-slate-500">
            Part of the bookchaowalit portfolio ecosystem • Built with Next.js 15 and TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
