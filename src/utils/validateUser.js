import { Alert } from "react-native"

export const validateUser = (data) => {
  let error = ["Campo Inválido", ""]
  if (data.username == null || data.username == '') {
    error[1] = "Username não pode ficar em branco"
  }
  else if (data.username.length < 3) {
    error[1] = "Username precisa de mínimo de 3 (três) caracteres"
  }
  else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
    error[1] = "Username não pode ter espaços e caracteres especiais."
  }
  else if (data.fullName == null || data.fullName == '') {
    error[1] = "Nome Completo não pode ficar em branco"
  }
  else if (data.email == null || data.email == '') {
    error[1] = "Email não pode ficar em branco"
  }
  else if (data.email.length < 6) {
    error[1] = "Email precisa de mínimo de 6 (seis) caracteres"
  }
  else if (!/\S+@\S+\.\S+/.test(data.email)) {
    error[1] = "Email inválido"
  }
  else if (data.password == null || data.password == '') {
    error[1] = "Senha não pode ficar em branco"
  }
  else if (data.password && data.password.length < 6) {
    error[1] = "Senha precisa de mínimo de 6 (seis) caracteres"
  }
  else if (!/.*[0-9].*/.test(data.password)) {
    error[1] = "Senha precisa conter no mínimo 1(um) número"
  }
  else if (data.password !== data.confirmPassword) {
    error[1] = "As senhas precisam ser iguais"
  }
  error[1] !== "" ? Alert.alert(error[0], error[1]) : null
  return error[1] === "" ? true : false
}