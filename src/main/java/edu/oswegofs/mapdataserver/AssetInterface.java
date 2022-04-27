package edu.oswegofs.mapdataserver;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetInterface extends JpaRepository<assets,Long> {

    List<assets> findByassetType(String assetType);

}
