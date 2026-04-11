package com.uade.tpejemplo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "creditos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dni_cliente", nullable = false)
    private Cliente cliente;

    @NotNull
    @Column(name = "deuda_original", nullable = false, precision = 12, scale = 2)
    private BigDecimal deudaOriginal;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "importe_cuota", nullable = false, precision = 12, scale = 2)
    private BigDecimal importeCuota;

    @Min(1)
    @Column(name = "cantidad_cuotas", nullable = false)
    private Integer cantidadCuotas;

    @OneToMany(mappedBy = "credito", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cuota> cuotas;

    // Getters
    public Long getId() { return id; }
    public Cliente getCliente() { return cliente; }
    public BigDecimal getDeudaOriginal() { return deudaOriginal; }
    public LocalDate getFecha() { return fecha; }
    public BigDecimal getImporteCuota() { return importeCuota; }
    public Integer getCantidadCuotas() { return cantidadCuotas; }
    public List<Cuota> getCuotas() { return cuotas; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    public void setDeudaOriginal(BigDecimal deudaOriginal) { this.deudaOriginal = deudaOriginal; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public void setImporteCuota(BigDecimal importeCuota) { this.importeCuota = importeCuota; }
    public void setCantidadCuotas(Integer cantidadCuotas) { this.cantidadCuotas = cantidadCuotas; }
    public void setCuotas(List<Cuota> cuotas) { this.cuotas = cuotas; }
}
