import axios from 'axios';

const WEBHOOK_URL = 'https://chat.spiry.ro/hooks/c4qtci7b5pdb8gwaf8n6iohgya';
const ICON_EMOJI = 'robot';
const USERNAME = 'Github Deployments';

const allowedEvents = [
  'deployment',
  'deployment_status'
];

const errorStates = ['error', 'failure'];

function getStateIcon(state) {
  switch (state) {
    case 'pending':
      return ':hourglass_flowing_sand:';
    case 'success':
      return ':white_check_mark:';
    case 'failure':
      return 'x';
    case 'error':
      return 'x';
  }
}

async function sendMessage(text) {
  await axios.post(WEBHOOK_URL, {
    username: USERNAME,
    icon_emoji: ICON_EMOJI,
    text
  });
}

async function handleNewDeployment(payload) {
  const { deployment, repository } = payload;
  const { creator } = deployment;

  const text = `**:rocket: <${repository.html_url}|${repository.name}> - New deployment**\nDescription: ${deployment.description || ''}\nEnvironment: ${deployment.environment}\nCreated by: ${creator.login}`;

  await sendMessage(text);
}

async function handleNewDeploymentStatus(payload) {
  const { deployment, deployment_status, repository } = payload;
  const { creator } = deployment_status;

  const text = `**${getStateIcon(deployment_status.state)} <${repository.html_url}|${repository.name}> - Deployment status updated**\nPreview: ${deployment_status.target_url}\nDescription: ${deployment_status.description || ''}\nEnvironment: ${deployment.environment}\nCreated by: ${creator.login}${errorStates.includes(deployment_status.state) ? '\n<!channel> Something went wrong! Please someone take a look at the deployment results.' : ''}`;

  await sendMessage(text);
}

export default async (req, res) => {
  const { body } = req;

  const event = req.headers['x-github-event'];

  if (!allowedEvents.includes(event)) {
    return res.status(200).end();
  }

  console.log(`Handling event: ${event}`);

  try {
    switch (event) {
      case 'deployment':
        await handleNewDeployment(body);
        break;
      case 'deployment_status':
        await handleNewDeploymentStatus(body);
        break;
    }
  
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message).env();
  }
}
