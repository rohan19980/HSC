//Al-Amin Rohan Dhali (20-130-910)
function fuzzyLogic(tlTick, tlPlacement, tramPlacement) {

    // Step 1:
    if (tramPlacement < tlPlacement / 3) {
        trafficLight.tlDistance = "far";
    } else if (tramPlacement > tlPlacement * 2 / 3) {
        trafficLight.tlDistance = "close";
    } else {
        trafficLight.tlDistance = "middle";
    }

    if (tlTick < redTick) {
        trafficLight.tlColor = "Red";
    } else if (tlTick < redTick + greenTick) {
        trafficLight.tlColor = "Green";
    } else {
        trafficLight.tlColor = "Orange";
    }

    sig = tlPlacement / 5.5

    /*
    St 1: If tram is Close to the Traffic Light OR Traffic Light is Red, then Slow Down.
        -applying gaussmf to close
        -applying trimf to red
        Slow Down -> ΜΑΧ(Distance=Close, Light=Red)
    */

    //Step 2: Apply Fuzzy operator
    case1Distance = gaussmf(tlPlacement - tramPlacement, sig, 0);
    case1Light = trimf(tlTick, 0, redTick, redTick);
    //Step 3: Apply inference method
    if (case1Distance > case1Light) {
        case1 = case1Distance;
    } else {
        case1 = case1Light;
    }

    /*
    st 2: If tram is neither far or close to Traffic Light OR Traffic Light is Green, then Keep Middle Speed.
        -applying gaussmf to Middle
        -applying trimf to Green
        Middle Speed -> MAX(Distance=Middle, Light=Green)
    */

    //Step 2: Apply Fuzzy operator
    case2Distance = gaussmf(tlPlacement - tramPlacement, sig, tlPlacement / 2);
    case2Light = trimf(tlTick, redTick, redTick + orangeTick, redTick + orangeTick + greenTick);
    //Step 3: Apply inference method
    if (case2Distance > case2Light) {
        case2 = case2Distance;
    } else {
        case2 = case2Light;
    }

    /*
    //Step 3: If tram is Far from the Traffic Light OR Traffic Light is Orange, then Speed Up.
        -applying gaussmf to Far
        -applying trimf στο Orange
        Speed Up -> MAX(Distance=Far, Light=Orange)
    */

    //Step 2: Fuzzy operator
    case3Distance = gaussmf(tlPlacement - tramPlacement, sig, tlPlacement);
    case3Light = trimf(tlTick, redTick + orangeTick, redTick + greenTick, redTick + orangeTick + greenTick);
    //Step 3: Apply inference method
    if (case3Distance > case3Light) {
        case3 = case3Distance;
    } else {
        case3 = case3Light;
    }

    // Step 4: Sum the results fo reach fuzzy variable output
    carSpeedChoice = case1 * 0 + case2 * 50 / 100 + case3;


    // on HTML page
    document.getElementById("case1Distance").value = case1Distance;
    document.getElementById("case2Distance").value = case2Distance;
    document.getElementById("case3Distance").value = case3Distance;
    document.getElementById("case1Light").value = case1Light;
    document.getElementById("case2Light").value = case2Light;
    document.getElementById("case3Light").value = case3Light;


    // Step 5: Disambiguate values: centroid (center weight)
    resultOfAggression = carSpeedChoice / 3;
    // Return the rate of speed the tram can advance: Monitor screen of the driver.
    return resultOfAggression;

}

function gaussmf(x, sig, c) {
    return Math.exp(-(Math.pow((x - c), 2)) / (2 * Math.pow(sig, 2)))
}

function trimf(x, a, b, c) {
    if (x <= a || c <= x) {
        return 0
    } else if (a <= x && x <= b) {
        return (x - a) / (b - a)
    } else if (b <= x && x <= c) {
        return (c - x) / (c - b)
    }
}
