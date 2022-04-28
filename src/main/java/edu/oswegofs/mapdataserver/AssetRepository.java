package edu.oswegofs.mapdataserver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Assets,Long> {

    // Find All Assets in Database
    List<Assets> findByAssetType(String assetType);

    // Get asset by Primary key (id)
    Optional<Assets> findByid(Long id);

    // Find All Asset Type and Category Pairs
    @Query(value = "SELECT distinct assetType,assetGroup from assets order by assetType", nativeQuery = true)
    List<String> findAssetIdAndCategory();

    // Get total Assets in Database
    long count();

    // Get Assets by Property #
    @Query(value = "select * from assets where assets.property = :property", nativeQuery = true)
    List<Assets> findByProperty(@Param("property") String property);

    @Query(value = "select * from assets where assets.property = :property" +
            " and assets.assetType = :assetType and assets.assetgroup = :assetGroup", nativeQuery = true)
    public List<Assets> findByPropTypeGroup(@Param("property") String property,
                                            @Param("assetType") String assetType,
                                            @Param("assetGroup") String assetGroup);

    @Query(value = "select * from assets where assets.property = :property" +
            " and assets.assetType = :assetType", nativeQuery = true)
    public List<Assets> findByPropType(@Param("property") String property,
                                            @Param("assetType") String assetType);

}
