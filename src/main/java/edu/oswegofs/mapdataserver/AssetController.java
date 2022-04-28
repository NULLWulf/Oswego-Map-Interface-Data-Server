package edu.oswegofs.mapdataserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetRepository assetRepository;

    public AssetController(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @GetMapping("/all")
    public Iterable<Assets> getAllAssets() {
        return assetRepository.findAll();
    }

    @GetMapping("/cat_type_list")
    public Iterable<String> getTypeCategoryList(){
        return assetRepository.findAssetIdAndCategory();
    }

    @GetMapping("/count")
    public long count(){
        return assetRepository.count();
    }
}
