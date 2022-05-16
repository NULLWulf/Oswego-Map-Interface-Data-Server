package edu.oswegofs.mapdataserver;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/property")
public class PropertyController {

    // Defines Property Repository
    private final PropertyRepository propertyRepository;
    private static final Logger log = LoggerFactory.getLogger(PropertyController.class);

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @GetMapping("/all")
    public Iterable<Property> GetAll(){
        log.info("Getting All Property Profiles");
        return propertyRepository.findAll();
    }

    @GetMapping("/latlong/{building_code}")
    public String getLatLong(@PathVariable String building_code){
        log.info("Getting Center Coordinates of Property " + building_code);
        Property property = propertyRepository.getById(building_code);
        return property.getLatLong();
    }
}
