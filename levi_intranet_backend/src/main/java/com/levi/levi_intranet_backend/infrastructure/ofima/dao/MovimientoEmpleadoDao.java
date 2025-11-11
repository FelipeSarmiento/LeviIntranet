package com.levi.levi_intranet_backend.infrastructure.ofima.dao;

import com.levi.levi_intranet_backend.domain.ofima.MovimientoEmpleado;
import com.levi.levi_intranet_backend.domain.ofima.NovedadesMovimientosEmpleados;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class MovimientoEmpleadoDao {
    private final NamedParameterJdbcTemplate jdbc;

    public MovimientoEmpleadoDao(@Qualifier("ofimaJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<NovedadesMovimientosEmpleados> MAPPER_NOVEDADES = new RowMapper<NovedadesMovimientosEmpleados>() {
        @Override
        public NovedadesMovimientosEmpleados mapRow(ResultSet rs, int rowNum) throws SQLException {
            NovedadesMovimientosEmpleados m = new NovedadesMovimientosEmpleados();
            m.setCodigoCentroCostos(rs.getInt("CodigoCentroCostos"));
            m.setConcepto(rs.getString("Concepto"));
            m.setCodigo(rs.getString("Codigo"));
            m.setDiasPago(rs.getInt("DiasPagos"));
            m.setFechaInicio(rs.getDate("FechaInicio"));
            m.setFechaFin(rs.getDate("FechaFin"));
            m.setFechaIngreso(rs.getDate("FechaIngreso"));
            m.setGrupo(rs.getString("Grupo"));
            m.setPeriodo(rs.getString("Periodo"));
            m.setValorAnterior(rs.getDouble("ValorAnterior"));

            return m;
        }
    };
    private static final RowMapper<MovimientoEmpleado> MAPPER_MOVIMIENTO = new RowMapper<MovimientoEmpleado>() {
        @Override
        public MovimientoEmpleado mapRow(ResultSet rs, int rowNum) throws SQLException {
            MovimientoEmpleado m = new MovimientoEmpleado();
            m.setCodigoCentroCostos(rs.getString("CodigoCentroCostos"));
            m.setCodigoCTA(rs.getString("CodigoCTA"));
            m.setCredito(rs.getString("Credito"));
            m.setDescripcion(rs.getString("Descripcion"));
            m.setDetalle(rs.getString("Detalle"));

            return m;
        }
    };

    public List<MovimientoEmpleado> findMovimientosEmpleados(String documento){
        String sql = """
                SELECT
                    CODCC AS CodigoCentroCostos,
                    CODIGOCTA AS CodigoCTA,
                    Credito AS Credito,
                    DESCRIPCIO AS Descripcion,
                    DETALLE AS Detalle,
                    FECHAMVTO AS FechaMovimiento,
                    FECHAREAL AS FechaReal,
                    FECING AS FechaIngreso,
                    FECMOD AS FechaModificacion,
                    IDMVTO AS IdMovimiento,
                    NIT AS NIT,
                    PASSWORDIN AS PasswordIn,
                    PASSWORDMO AS PasswordMo,
                    NIIF AS NIIF,
                    DCTO AS Documento
                FROM MVTO WHERE DCTO = :Documento
                """;
        var params = Map.of("Documento", documento);
        return jdbc.query(sql,params, MAPPER_MOVIMIENTO);
    }

    public List<NovedadesMovimientosEmpleados> findNovedadesMovimientosEmpleados() {
        String sql = """
                SELECT
                    CODCC AS CodigoCentroCostos,
                    CODIGO AS Codigo,
                    CONCEP AS Concepto,
                    DIASPAG AS DiasPagos,
                    FECINI AS FechaInicio,
                    FECFIN AS FechaFin,
                    FECING AS FechaIngreso,
                    GRUPO AS Grupo,
                    PERIODO AS Periodo,
                    VALOR AS Valor,
                    VLANTERIOR AS ValorAnterior
                FROM MVNOVEDA WHERE CONCEP = '037';
                """;
        return jdbc.query(sql, MAPPER_NOVEDADES);
    }
    public List<NovedadesMovimientosEmpleados> findMovimientosCerradosEmpleados() {
        String sql = """
                SELECT
                    CODCC AS CodigoCentroCostos,
                    CODIGO AS Codigo,
                    CONCEP AS Concepto,
                    DIASPAG AS DiasPagos,
                    FECINI AS FechaInicio,
                    FECFIN AS FechaFin,
                    FECING AS FechaIngreso,
                    GRUPO AS Grupo,
                    PERIODO AS Periodo,
                    VALOR AS Valor,
                    VLANTERIOR AS ValorAnterior
                FROM MVCERRAD WHERE CONCEP = '037';
                """;
        return jdbc.query(sql, MAPPER_NOVEDADES);
    }

    public void saveNovedadesMovimientoEmpleado(List<NovedadesMovimientosEmpleados> movimientos) {
        String sql = """
        INSERT INTO MVNOVPER (CODCC, CODIGO, CONCEP, FECLIQUIDA, FECING, FECHA, FECMOD, GRUPO, INTEGRADO, NOMABIERTA, NROHORAS, PASSWORDIN, PASSWORDMO, VALOR, NOTA)
        VALUES (:CodigoCentroCostos, :Codigo, :Concepto, :FechaLiquidacion, :FechaIngreso, :Fecha, :FechaModificacion, :Grupo, :Integrado, :NominaAbierta, :NumeroHoras, :PasswordIn, :PasswordMo, :Valor, :Nota)
        """;

        SqlParameterSource[] batchParams = movimientos.stream()
                .map(movimiento -> new MapSqlParameterSource()
                        .addValue("CodigoCentroCostos", movimiento.getCodigoCentroCostos())
                        .addValue("Codigo", movimiento.getCodigo())
                        .addValue("Concepto", movimiento.getConcepto())
                        .addValue("FechaLiquidacion", movimiento.getFechaLiquidacion())
                        .addValue("FechaIngreso", movimiento.getFechaIngreso())
                        .addValue("Fecha", movimiento.getFechaInicio())
                        .addValue("FechaModificacion", movimiento.getFechaModificacion())
                        .addValue("Grupo", movimiento.getGrupo())
                        .addValue("Integrado", movimiento.isIntegrado())
                        .addValue("NominaAbierta", movimiento.isNominaAbierta())
                        .addValue("NumeroHoras", movimiento.getNumeroHoras())
                        .addValue("PasswordIn", movimiento.getPasswordIn())
                        .addValue("PasswordMo", movimiento.getPasswordMo())
                        .addValue("Valor", movimiento.getValor())
                        .addValue("Nota", movimiento.getNota())
                ).toArray(SqlParameterSource[]::new);

        jdbc.batchUpdate(sql, batchParams);
    }

}
