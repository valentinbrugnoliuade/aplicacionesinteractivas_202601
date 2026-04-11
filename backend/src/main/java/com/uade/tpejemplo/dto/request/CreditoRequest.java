package com.uade.tpejemplo.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditoRequest {

    @NotBlank(message = "El DNI del cliente es obligatorio")
    private String dniCliente;

    @NotNull(message = "La deuda original es obligatoria")
    @Positive(message = "La deuda original debe ser mayor a cero")
    private BigDecimal deudaOriginal;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "El importe de cuota es obligatorio")
    @Positive(message = "El importe de cuota debe ser mayor a cero")
    private BigDecimal importeCuota;

    @NotNull(message = "La cantidad de cuotas es obligatoria")
    @Min(value = 1, message = "Debe tener al menos 1 cuota")
    private Integer cantidadCuotas;

    // Getters
    public String getDniCliente() { return dniCliente; }
    public BigDecimal getDeudaOriginal() { return deudaOriginal; }
    public LocalDate getFecha() { return fecha; }
    public BigDecimal getImporteCuota() { return importeCuota; }
    public Integer getCantidadCuotas() { return cantidadCuotas; }

    // Setters
    public void setDniCliente(String dniCliente) { this.dniCliente = dniCliente; }
    public void setDeudaOriginal(BigDecimal deudaOriginal) { this.deudaOriginal = deudaOriginal; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public void setImporteCuota(BigDecimal importeCuota) { this.importeCuota = importeCuota; }
    public void setCantidadCuotas(Integer cantidadCuotas) { this.cantidadCuotas = cantidadCuotas; }
}
