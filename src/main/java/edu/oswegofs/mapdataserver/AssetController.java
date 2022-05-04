package edu.oswegofs.mapdataserver;

import org.aspectj.weaver.patterns.HasThisTypePatternTriedToSneakInSomeGenericOrParameterizedTypePatternMatchingStuffAnywhereVisitor;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetRepository assetRepository;

    private static final Logger log = LoggerFactory.getLogger(AssetController.class);


    // Assigns Asset Repo to this Controller
    public AssetController(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // Get All Assets from the Database
    @GetMapping("/")
    public Iterable<Assets> getAllAssets() {
        log.info("Getting All Assets");
        return assetRepository.findAll();
    }

    // Get Distinct pair lists of Types and Categories
    @GetMapping("/cat_type_list")
    public Iterable<String> getTypeCategoryList(){
        log.info("Getting Asset Type and Category Cartesian List");
        return assetRepository.findAssetIdAndCategory();
    }

    // Get count of all assets in database
    @GetMapping("/count")
    public long count(){
        log.info("Getting Asset Count");
        return assetRepository.count();
    }

    // Get by Asset Id
    @GetMapping("/{id}")
    public Optional<Assets> getId(@PathVariable Long id) {
        log.info("Getting Asset: " + id + ".");
        return assetRepository.findByid(id);
    }

    // Get Assets by Property #
    @GetMapping("/property/{propertyId}")
    public Iterable<Assets> getByPropertyId(@PathVariable String propertyId){
        log.info("Getting Assets from Building No: " + propertyId + ".");

        return assetRepository.findByProperty(propertyId);
    }

    @GetMapping("/property/{propertyId}/{assetType}")
    public Iterable<Assets> getByPropertyIdAssetType(@PathVariable String propertyId,
                                                     @PathVariable String assetType){
        log.info("Getting Assets from Building No: " + propertyId + ". that is Asset Type: " + assetType + " .");
        return assetRepository.findByPropType(propertyId,assetType);
    }

    @GetMapping("/property/{propertyId}/{assetType}/{assetGroup}")
    public Iterable<Assets> getByPropertyIdAssetTypeGroup(@PathVariable String propertyId,
                                                          @PathVariable String assetType,
                                                          @PathVariable String assetGroup){
        System.out.printf("""
                ----- Getting Assets from Building No: %s  -----
                -----              that is Asset Type: %s  -----
                -----              that is Asset Group: %s -----
                """, propertyId,assetType,assetGroup);
        return assetRepository.findByPropTypeGroup(propertyId, assetType, assetGroup);
    }
}
