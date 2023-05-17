

const Button = (props) => {
    const { type, title, onClick, icon } = props;
    return (
        <button type="button" className={`btn btn-${type} m-2`} onClick={onClick} >
            <i className={`material-icons`}>{icon}</i>
            {title}
        </button>
    )
}
export default Button;