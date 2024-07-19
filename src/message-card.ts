export function createMessageCard(
  notificationSummary: string,
  notificationColor: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string
): any {
  const avatar_url = author?.avatar_url ? author.avatar_url : 'https://www.cdnlogo.com/logos/g/69/github-icon.svg';
  const author_url = author?.login && author.html_url ? `[@${author.login}](${author.html_url})` : '';

  const adaptiveCard = {
    type: 'AdaptiveCard',
    summary: notificationSummary,
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: notificationSummary,
        weight: 'Bolder',
        size: 'Large',
        color: notificationColor,
      },
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'Image',
                url: avatar_url,
                size: 'Small',
                style: 'Person',
              },
            ],
          },
          {
            type: 'Column',
            width: 'stretch',
            items: [
              {
                type: 'TextBlock',
                text: `**CI #${runNum} (commit ${sha.substring(0, 7)})** on [${repoName}](${repoUrl})`,
                wrap: true,
              },
              {
                type: 'TextBlock',
                text: `by ${commit.data.commit.author.name} ${author_url} on ${timestamp}`,
                isSubtle: true,
                wrap: true,
              },
            ],
          },
        ],
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'View Workflow Run',
        url: `${repoUrl}/actions/runs/${runId}`,
      },
      {
        type: 'Action.OpenUrl',
        title: 'View Commit Changes',
        url: commit.data.html_url,
      },
    ],
  };

  return adaptiveCard;
}
