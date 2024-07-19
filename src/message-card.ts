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
  const newMessageCard = {
    type: 'AdaptiveCard',
    summary: notificationSummary,
    body: [
      {
        type: 'TextBlock',
        size: 'large',
        weight: 'Bolder',
        text: "@{variables('varCardTitle')}",
        wrap: true,
      },
      {
        type: 'TextBlock',
        text: 'A new idea has been submitted!',
        wrap: true,
      },
      {
        type: 'TextBlock',
        text: "For the campaign: @{variables('varCampaign')}",
        wrap: true,
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: "View @{variables('varCardTitle')}",
        url: "https://teams.microsoft.com/l/entity/b7fad6ce-2e23-4aba-b209-859a59ca230e/_djb2_msteams_prefix_1434832750?context=@{outputs('Compose')}",
      },
    ],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.2',
  };

  return newMessageCard;
}
