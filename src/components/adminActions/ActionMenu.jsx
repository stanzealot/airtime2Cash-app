import './actionMenu.scss';

const ActionMenu = ({ actions, close }) => {
  const handleClick = (handler, e) => {
    handler();
    close();
  };

  return (
    <ul className="actionMenu">
      {actions.map((action, index) => (
        <li className="actionItem" onClick={handleClick.bind(null, action.handler)} key={index}>{action.text}</li>
      ))}
    </ul>
  )
}

export default ActionMenu;