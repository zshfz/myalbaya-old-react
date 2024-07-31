import style from "../styles/ToggleButton.module.css";

const ToggleButton = (props) => {
  return (
    <label className={style.container}>
      <input
        type="checkbox"
        checked={props.isToggled}
        onChange={props.onToggle}
      />
      <span className={style.slider} />
    </label>
  );
};

export default ToggleButton;
