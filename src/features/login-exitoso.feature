@login @positive @smoke
Feature: Login exitoso en SauceDemo

  Scenario: Ingresar con una cuenta estándar
    Given que el usuario abre SauceDemo
    When inicia sesión con la cuenta "standard"
    Then visualiza el inventario
