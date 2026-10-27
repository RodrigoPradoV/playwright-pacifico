@cart @outline
Feature: Carrito de SauceDemo

  Scenario Outline: Agregar un producto variable al carrito
    Given que el usuario estándar inició sesión
    When agrega "<producto>" al carrito
    And abre el carrito
    Then el carrito contiene "<producto>"

    Examples:
      | producto |
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
