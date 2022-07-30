export default ({ redirect, route }) => {
    if (route.fullPath === "/r") {
        redirect("/recipes");
    }
};
