import axios from 'axios';

const allowedEvents = [
  'deployment',
  'deployment_status'
];

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

async function handleNewDeployment(payload) {
  const { deployment, repository } = payload;
  const { creator } = deployment;

  await axios.post('https://mm.devdavi.com.br/hooks/h9gn9pjse3f49n1gwgte4md8me', {
    username: 'github-deployments',
    icon_url: 'https://static.vecteezy.com/system/resources/previews/001/951/982/non_2x/cute-little-boy-in-rocket-avatar-character-free-vector.jpg',
    text: `**:rocket: ${repository.name} - New deployment**\nDeployment: ${deployment.url}\nDescription: ${deployment.description}\nEnvironment: ${deployment.environment}\nCreated by: ${creator.login}`
  });
}

async function handleNewDeploymentStatus(payload) {
  const { deployment, deployment_status, repository } = payload;
  const { creator } = deployment_status;

  await axios.post('https://mm.devdavi.com.br/hooks/h9gn9pjse3f49n1gwgte4md8me', {
    username: 'github-deployments',
    icon_url: 'https://static.vecteezy.com/system/resources/previews/001/951/982/non_2x/cute-little-boy-in-rocket-avatar-character-free-vector.jpg',
    text: `**${getStateIcon(deployment_status.state)} ${repository.name} - Deployment status updated**\nPreview: ${deployment_status.target_url}\nDeployment: ${deployment.url}\nDescription: ${deployment_status.description}\nEnvironment: ${deployment.environment}\nCreated by: ${creator.login}`
  });
}

export default async (req, res) => {
  const { body } = req;

  const event = req.headers['x-github-event'];

  if (!allowedEvents.includes(event)) {
    return res.status(200).end();
  }

  switch (event) {
    case 'deployment':
      await handleNewDeployment(body);
      break;
    case 'deployment_status':
      await handleNewDeploymentStatus(body);
      break;
  }

  res.status(200).end();
}
