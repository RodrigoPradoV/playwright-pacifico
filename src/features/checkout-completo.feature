@checkout @positive @smoke
Feature: Checkout completo en SauceDemo

  Scenario: Completar una compra
    Given que el usuario estándar inició sesión
    And que tiene "Sauce Labs Backpack" en el carrito
    When inicia el checkout
    And completa la información con nombre "QA", apellido "Automation" y código postal "15001"
    And continúa al resumen
    And finaliza la compra
    Then la compra se confirma
