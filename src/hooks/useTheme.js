import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../app/features/themeReducer";

function useTheme() {
  const pageTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(setTheme(!pageTheme.isDarkModeOn));

  return { pageTheme, changeTheme };
}

export default useTheme;
