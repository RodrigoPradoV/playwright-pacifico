@checkout @negative
Feature: Checkout negativo en SauceDemo

  Scenario: Rechazar checkout sin código postal
    Given que el usuario estándar inició sesión
    And que tiene "Sauce Labs Backpack" en el carrito
    When inicia el checkout
    And completa la información con nombre "QA", apellido "Automation" y código postal ""
    And continúa al resumen
    Then visualiza el error de checkout "Error: Postal Code is required"
