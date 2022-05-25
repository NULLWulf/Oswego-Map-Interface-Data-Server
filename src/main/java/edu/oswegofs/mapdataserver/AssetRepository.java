package edu.oswegofs.mapdataserver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Assets,Long> {

    // Find by Asset Type
    List<Assets> findByAssetType(String assetType);

    // Get asset by Primary key (id)
    @Query(value = "SELECT * from assets where assets.asset_id = :asset_id", nativeQuery = true)
    Optional<Assets> findByAssetId(Long asset_id);

    // Find All Asset Type and Category Pairs
    @Query(value = "SELECT distinct asset_type,asset_group from assets order by asset_type", nativeQuery = true)
    List<String> findAssetIdAndCategory();

    // Get total Assets in Database
    long count();

    // Get Asset Count Based on Building #
    @Query(value = "select COUNT(asset_id) from assets where assets.property = :property", nativeQuery = true)
    long getCountByPropertyNum(@Param("property") String property);

    // Get Assets by Property #
    @Query(value = "select * from assets where assets.property = :property", nativeQuery = true)
    List<Assets> findByProperty(@Param("property") String property);

    @Query(value = "select * from assets where assets.property = :property" +
            " and assets.asset_type = :assetType and assets.asset_group = :assetGroup", nativeQuery = true)
    public List<Assets> findByPropTypeGroup(@Param("property") String property,
                                            @Param("assetType") String assetType,
                                            @Param("assetGroup") String assetGroup);

    @Query(value = "select * from assets where assets.property = :property" +
            " and assets.assetType = :assetType", nativeQuery = true)
    public List<Assets> findByPropType(@Param("property") String property,
                                            @Param("assetType") String assetType);

}
