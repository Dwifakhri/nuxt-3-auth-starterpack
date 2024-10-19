export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  if (status.value === "unauthenticated" && to.name !== "login") {
    return navigateTo("/login")
  }

  if (to.name === "login" && status.value === "authenticated")
    return navigateTo("/")
})
