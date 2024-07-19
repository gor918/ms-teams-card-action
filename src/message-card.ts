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
  const avatar_url: string = author?.avatar_url
    ? author.avatar_url
    : 'https://www.cdnlogo.com/logos/g/69/github-icon.svg';

  const author_url = author?.login && author.html_url ? `[(@${author.login})](${author.html_url}) ` : '';

  const messageCard = {
    type: 'AdaptiveCard',
    body: [
      {
        type: 'Container',
        items: [
          {
            type: 'TextBlock',
            size: 'Large',
            weight: 'Bolder',
            text: notificationSummary,
            wrap: true,
            style: 'heading',
          },
        ],
        padding: 'Default',
        spacing: 'None',
        separator: true,
      },
      {
        type: 'Container',
        id: '7d00f965-40bb-9fc3-ff7b-a9b82a09ead4',
        padding: 'Default',
        items: [
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                items: [
                  {
                    type: 'Image',
                    style: 'Person',
                    url: avatar_url,
                    size: 'Small',
                    altText: `${commit.data.commit.author.name}`,
                  },
                ],
                width: 'auto',
                padding: 'None',
              },
              {
                type: 'Column',
                items: [
                  {
                    type: 'TextBlock',
                    text: `**CI #${runNum} (commit ${sha.substring(0, 7)})** on [${repoName}](${repoUrl})`,
                    wrap: true,
                  },
                  {
                    type: 'TextBlock',
                    spacing: 'None',
                    color: 'Light',
                    text: `by ${commit.data.commit.author.name} ${author_url}on ${timestamp}`,
                    wrap: true,
                    size: 'Small',
                  },
                ],
                width: 'stretch',
                padding: 'None',
              },
            ],
            spacing: 'None',
            padding: 'None',
          },
        ],
        spacing: 'None',
        separator: true,
      },
      {
        type: 'Container',
        id: '353b659f-b668-fac0-5b7f-5d2f1bdb46ac',
        padding: 'Default',
        items: [
          {
            type: 'ActionSet',
            actions: [
              {
                type: 'Action.Http',
                id: 'viewWorkflowRun',
                title: 'View Workflow Run',
                method: 'POST',
                url: `${repoUrl}/actions/runs/${runId}`,
                body: '{}',
                isPrimary: true,
                style: 'positive',
              },
              {
                type: 'Action.Http',
                id: 'viewCommitChanges',
                title: 'View Commit Changes',
                method: 'POST',
                url: commit.data.html_url,
                body: '{}',
                isPrimary: false,
                style: 'positive',
              },
            ],
            spacing: 'None',
          },
        ],
        spacing: 'None',
        separator: true,
      },
    ],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    padding: 'None',
  };

  return messageCard;
}
