package edu.oswegofs.mapdataserver;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/property")
public class PropertyController {

    private final PropertyRepository propertyRepository;
    private static final Logger log = LoggerFactory.getLogger(PropertyController.class);

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @GetMapping("/coordinates/{buildingNo}")
    public String getBuildingCoordinates(@PathVariable String buildingNo) {
        Property property = propertyRepository.findById(buildingNo);

    }
}


