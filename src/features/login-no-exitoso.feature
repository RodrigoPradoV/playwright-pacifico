@login @negative @outline
Feature: Login no exitoso en SauceDemo

  Scenario Outline: Rechazar cuentas que no pueden autenticarse
    Given que el usuario abre SauceDemo
    When inicia sesión con la cuenta "<cuenta>"
    Then visualiza el mensaje de acceso "<mensaje>"

    Examples:
      | cuenta | mensaje |
      | locked | Epic sadface: Sorry, this user has been locked out. |
      | invalid | Epic sadface: Username and password do not match any user in this service |
