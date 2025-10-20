package com.levi.levi_intranet_backend.infrastructure.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DataSourcesConfig {

    // SIESA
    @Bean @Primary
    @ConfigurationProperties("spring.datasource.siesa")
    public DataSource siesaDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver")
                .url("jdbc:sqlserver://10.160.1.120:1433;databaseName=UnoEE_Levistrauss_Real;encrypt=false;trustServerCertificate=true")
                .username("Levistrauss")
                .password("Levistrauss$12$%")
                .build();
    }
    @Bean @Primary
    public NamedParameterJdbcTemplate siesaJdbc(@Qualifier("siesaDataSource") DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }
    @Bean @Primary
    public PlatformTransactionManager siesaTx(@Qualifier("siesaDataSource") DataSource ds) {
        return new DataSourceTransactionManager(ds);
    }
    // LEVIS
    @Bean
    @ConfigurationProperties("spring.datasource.levis")
    public DataSource levisDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver")
                .url("jdbc:sqlserver://10.105.63.4:1433;databaseName=db_grupofaro;encrypt=false;trustServerCertificate=true")
                .username("unoee")
                .password("enterprise")
                .build();
    }
    @Bean
    public NamedParameterJdbcTemplate levisJdbc(@Qualifier("levisDataSource") DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }
    @Bean
    public PlatformTransactionManager levisTx(@Qualifier("levisDataSource") DataSource ds) {
        return new DataSourceTransactionManager(ds);
    }
    // OFIMA
    @Bean
    @ConfigurationProperties("spring.datasource.ofima")
    public DataSource ofimaDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver")
                .url("jdbc:sqlserver://10.105.63.4:1433;databaseName=LEVIS;encrypt=false;trustServerCertificate=true")
                .username("unoee")
                .password("enterprise")
                .build();
    }
    @Bean
    public NamedParameterJdbcTemplate ofimaJdbc(@Qualifier("ofimaDataSource") DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }
    @Bean
    public PlatformTransactionManager ofimaTx(@Qualifier("ofimaDataSource") DataSource ds) {
        return new DataSourceTransactionManager(ds);
    }
}
