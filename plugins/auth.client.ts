import axios from "axios";

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "auth",
    () => {
      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/auth/check",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      axios(config)
        .then((response: any) => {
          const path = window.location.pathname.split("/")[1];
          if (response.data) {
            if (path === "login") {
              return navigateTo("/");
            } else {
              return navigateTo("/" + path);
            }
          } else {
            return navigateTo("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          return navigateTo("/login");
        });
    },
    { global: true }
  );
});
