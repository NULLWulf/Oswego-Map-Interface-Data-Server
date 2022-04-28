package edu.oswegofs.mapdataserver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Assets,Long> {

    // Find All Assets in Database
    List<Assets> findByAssetType(String assetType);

    Optional<Assets> findByid(Long id);

    // Find All Asset Type and Category Pairs
    @Query(value = "SELECT distinct assetType,asseTgroup from assets order by assetType", nativeQuery = true)
    List<String> findAssetIdAndCategory();

    // Get total Assets in Database
    long count();

}
