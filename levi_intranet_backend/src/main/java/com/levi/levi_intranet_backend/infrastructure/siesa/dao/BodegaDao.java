package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.Bodegas;
import com.levi.levi_intranet_backend.domain.siesa.Items;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class BodegaDao {
    private final NamedParameterJdbcTemplate jdbc;

    public BodegaDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Bodegas> MAPPER = new RowMapper<Bodegas>() {
        @Override
        public Bodegas mapRow(ResultSet rs, int rowNum) throws SQLException {
            Bodegas b = new Bodegas();

            b.setId(rs.getString("id"));
            b.setDescripcion(rs.getString("descripcion"));
            b.setDescripcionCorta(rs.getString("descripcionCorta"));
            b.setRowId(rs.getInt("rowId"));
            b.setIdBd(rs.getString("idBd"));
            b.setIdCia(rs.getShort("idCia"));
            b.setNotas(rs.getString("notas"));
            b.setIdCiaBaseMrp(rs.getShort("idCiaBaseMrp"));
            b.setIdentificacionMac(rs.getString("identificacionMac"));
            b.setIdInstalacion(rs.getString("idInstalacion"));
            b.setIdInstalacionBaseMrp(rs.getString("idInstalacionBaseMrp"));
            b.setIndCntrlExistencia(rs.getShort("indCntrlExistencia"));
            b.setIndConsigDada(rs.getShort("indConsigDada"));
            b.setIndExclusivoPdv(rs.getShort("indExclusivoPdv"));
            b.setIndCntrlDisponibilidad(rs.getShort("indCntrlDisponibilidad"));
            b.setRowIdMovtoEntidad(rs.getInt("rowIdMovtoEntidad"));
            b.setIdPortafolioInv(rs.getString("idPortafolioInv"));
            b.setIndUmPortafolioInv(rs.getShort("indUmPortafolioInv"));
            b.setRowIdCentroCostos(rs.getShort("rowIdCentroCostos"));
            b.setIndConsigRecibida(rs.getShort("indConsigRecibida"));
            b.setRowIdBodegaPropia(rs.getShort("rowIdBodegaPropia"));
            b.setIndConsiderableMrp(rs.getShort("indConsiderableMrp"));
            b.setIdCo(rs.getString("idCo"));
            b.setRowIdContacto(rs.getShort("rowIdContacto"));
            b.setIndEstado(rs.getShort("indEstado"));
            b.setIndMultiUbicacion(rs.getShort("indMultiUbicacion"));
            b.setIndLotes(rs.getShort("indLotes"));
            b.setIndCostos(rs.getShort("indCostos"));
            b.setIndFacturable(rs.getShort("indFacturable"));



            return b;
        }
    };

    public List<Bodegas> findAllBodegas() {
        var sql = "SELECT TOP 1000 [f150_id_cia] as idCia,[f150_rowid] as rowId, [f150_id] as id,[f150_descripcion] as descripcion ,[f150_descripcion_corta] as descripcionCorta ,[f150_id_co] as idCo,[f150_id_instalacion] as idInstalacion,[f150_rowid_contacto] as rowIdContacto,[f150_ind_estado] as indEstado,[f150_ind_cntrl_existencia] as indCntrlExistencia,[f150_ind_multi_ubicacion] as indMultiUbicacion, [f150_ind_lotes] as indLotes, [f150_ind_costos] as indCostos, [f150_ind_facturable] as indFacturable,[f150_ind_considerable_mrp] as indConsiderableMrp ,[f150_notas] as notas,[f150_id_instalacion_base_mrp] as idInstalacionBaseMrp,[f150_id_cia_base_mrp] as idCiaBaseMrp ,[f150_ind_consig_dada] as indConsigDada ,[f150_ind_exclusivo_pdv] as indExclusivoPdv,[f150_ind_cntrl_disponibilidad] as indCntrlDisponibilidad, [f150_rowid_movto_entidad] as rowIdMovtoEntidad, [f150_id_bd] as idBd,[f150_identificacion_mac] as identificacionMac, [f150_id_portafolio_inv] as idPortafolioInv ,[f150_ind_um_portafolio_inv] as indUmPortafolioInv , [f150_rowid_ccosto] rowIdCentroCostos, [f150_ind_consig_recibida] as indConsigRecibida, [f150_rowid_bodega_propia] as rowIdBodegaPropia FROM [UnoEE_Levistrauss_Real].[dbo].[t150_mc_bodegas] WHERE f150_ind_estado != 0 AND f150_id_cia = 1";

        var list = jdbc.query(sql, MAPPER);
        return list;
    }

    public List<Map<String, String>> findAllUbicaciones(String rowIdBodega, String compania) {
        var sql = """
                select f155_id as Id,f155_descripcion as descripcion from t155_mc_ubicacion_auxiliares
                    where f155_rowid_bodega = :rowIdBodega
                                and f155_id_cia = :compania
                """;
        var params = Map.of("rowIdBodega", rowIdBodega, "compania", compania);
        return jdbc.query(sql, params, (rs, rowNum) -> Map.of("id", rs.getString("Id"), "descripcion", rs.getString("descripcion")));

    }

}