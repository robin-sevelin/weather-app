# pseudokod för väder app

//////////////////////////////////////////////////////////

# HTML

# i index.html ska det finnas:

- Själva appen som innesluter hela projektet, div id="weather-app"

# I app containern ska det finnas:

- div id="weather-img" för sjävaste bild ikonen
- div id="weather-info" som ska innehålla beskrivningen av vädret
- div id="my-position" som innehåller platsinformationen

//////////////////////////////////////////////////////////

# JavaScript

- Appen kommer jobba utifrån ett API (smhi)
- bilden, temperaturen och väderbeskrivningen hämtas från API och renderas i sina containers därifrån
- Platsbeskrivningen kommer använda webbläsarens inbyggda funktion för att ta reda på var man befinner sig
- Temperaturen ska kunna klickas på och konvertera Celsius till Fahrenheit och vice verse
- Det ska finns en funktion som känner av datum och tid på dygnet vilket ska påverka vilken bakgrundsbild som visas

//////////////////////////////////////////////////////////
