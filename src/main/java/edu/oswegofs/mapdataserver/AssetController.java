package edu.oswegofs.mapdataserver;

import org.apache.logging.log4j.Logger;
import org.aspectj.weaver.patterns.HasThisTypePatternTriedToSneakInSomeGenericOrParameterizedTypePatternMatchingStuffAnywhereVisitor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetRepository assetRepository;

    // Assigns Asset Repo to this Controller
    public AssetController(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // Get All Assets from the Database
    @GetMapping("/")
    public Iterable<Assets> getAllAssets() {
        System.out.println("----- Getting All Assets -----");
        return assetRepository.findAll();
    }

    // Get Distinct pair lists of Types and Categories
    @GetMapping("/cat_type_list")
    public Iterable<String> getTypeCategoryList(){
        System.out.println("----- Getting Asset Type and Category Cartesian List -----");
        return assetRepository.findAssetIdAndCategory();
    }

    // Get count of all assets in database
    @GetMapping("/count")
    public long count(){
        System.out.println("----- Getting Asset Count -----");
        return assetRepository.count();
    }

    // Get by Asset Id
    @GetMapping("/{id}")
    public Optional<Assets> getId(@PathVariable Long id) {
        System.out.println("----- Getting Asset: " + id + " -----");
        return assetRepository.findByid(id);
    }

    // Get Assets by Property #
    @GetMapping("/property/{propertyId}")
    public Iterable<Assets> getByPropertyId(@PathVariable String propertyId){
        System.out.println("----- Getting Assets from Building No: " + propertyId + " -----");

        return assetRepository.findByProperty(propertyId);
    }

    @GetMapping("/property/{propertyId}/{assetType}")
    public Iterable<Assets> getByPropertyIdAssetType(@PathVariable String propertyId,
                                                     @PathVariable String assetType){
        System.out.printf("""
                ----- Getting Assets from Building No: %s -----
                -----              that is Asset Type: %s -----
                """, propertyId,assetType);
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
