import { connect } from "react-redux";
import Header from "../index";
import { deleteUserOfRedux } from "../../../redux/actions";

export default connect(
  (state) => ({
    title: state.changeTitle,
    user: state.user,
  }),
  { deleteUserOfRedux }
)(Header);
