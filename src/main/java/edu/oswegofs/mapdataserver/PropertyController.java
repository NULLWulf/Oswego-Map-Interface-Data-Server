package edu.oswegofs.mapdataserver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

    @GetMapping("/{building_code}")
    public Property getPropertyById(@PathVariable String building_code){
        log.info("Getting Center Coordinates of Property " + building_code);
        return propertyRepository.findById(building_code).orElseGet(Property::new);
    }
}
