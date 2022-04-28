package edu.oswegofs.mapdataserver;

import org.apache.logging.log4j.Logger;
import org.aspectj.weaver.patterns.HasThisTypePatternTriedToSneakInSomeGenericOrParameterizedTypePatternMatchingStuffAnywhereVisitor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@CrossOrigin
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
        System.out.println("Getting Assets");
        return assetRepository.findAll();
    }

    // Get Distinct pair lists of Types and Categories
    @GetMapping("/cat_type_list")
    public Iterable<String> getTypeCategoryList(){
        return assetRepository.findAssetIdAndCategory();
    }

    // Get count of all assets in database
    @GetMapping("/count")
    public long count(){
        return assetRepository.count();
    }

    // Get by Asset Id
    @GetMapping("/{id}")
    public Optional<Assets> getId(@PathVariable Long id) {
        return assetRepository.findByid(id);
    }

    // Get Assets by Property #
    @GetMapping("/property/{propertyId}")
    public Iterable<Assets> getByPropertyId(@PathVariable String propertyId){
        return assetRepository.findByProperty(propertyId);
    }

    @GetMapping("/property/{propertyId}/{assetType}")
    public Iterable<Assets> getByPropertyIdAssetType(@PathVariable String propertyId,
                                                     @PathVariable String assetType){
        return assetRepository.findByPropType(propertyId,assetType);
    }

    @GetMapping("/property/{propertyId}/{assetType}/{assetGroup}")
    public Iterable<Assets> getByPropertyIdAssetTypeGroup(@PathVariable String propertyId,
                                                          @PathVariable String assetType,
                                                          @PathVariable String assetGroup){
        return assetRepository.findByPropTypeGroup(propertyId, assetType, assetGroup);
    }
}
