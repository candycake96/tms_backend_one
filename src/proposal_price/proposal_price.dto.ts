import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProposalPriceAddDto {

  @IsString()
  @IsNotEmpty()
  costs_type_vehicle: string;

  @IsNumber()
  price_vehicle: number;

  @IsNumber()
  lifespan: number;

  @IsNumber()
  interest_rate: number;

  @IsNumber()
  Installments: number;

  @IsNumber()
  residual_value: number;

  @IsNumber()
  purchase_month: number;

  @IsNumber()
  light_duty_vehicle: number;

  @IsNumber()
  heavy_duty_vehicle: number;

  @IsNumber()
  tyre_price: number;

  @IsNumber()
  tyre_count: number;

  @IsNumber()
  tire_mileage_limit: number;

  @IsNumber()
  average_speed: number;

  @IsNumber()
  working_hours: number;

  @IsNumber()
  rest_time: number;

  @IsNumber()
  origin_stop_time: number;

  @IsNumber()
  destination_stop_time: number;

  @IsNumber()
  container_rest_time: number;

  @IsNumber()
  driver_salary: number;

  @IsNumber()
  vehicle_premium_amount: number;

  @IsNumber()
  cargo_premium_amount: number;

  @IsNumber()
  registration_fee: number;

  @IsNumber()
  tax_fee: number;

  @IsNumber()
  car_loan_payment: number;

  @IsNumber()
  gps_installation: number;
  
  @IsNumber()
  woking_hours: number;
}

export class ProposalPriceEditDto {
  @IsNumber()
  @IsNotEmpty()
  costs_id: number;

  @IsString()
  @IsNotEmpty()
  costs_type_vehicle: string;

  @IsNumber()
  price_vehicle: number;

  @IsNumber()
  lifespan: number;

  @IsNumber()
  interest_rate: number;

  @IsNumber()
  Installments: number;

  @IsNumber()
  residual_value: number;

  @IsNumber()
  purchase_month: number;

  @IsNumber()
  light_duty_vehicle: number;

  @IsNumber()
  heavy_duty_vehicle: number;

  @IsNumber()
  tyre_price: number;

  @IsNumber()
  tyre_count: number;

  @IsNumber()
  tire_mileage_limit: number;

  @IsNumber()
  average_speed: number;

  @IsNumber()
  working_hours: number;

  @IsNumber()
  rest_time: number;

  @IsNumber()
  origin_stop_time: number;

  @IsNumber()
  destination_stop_time: number;

  @IsNumber()
  container_rest_time: number;

  @IsNumber()
  driver_salary: number;

  @IsNumber()
  vehicle_premium_amount: number;

  @IsNumber()
  cargo_premium_amount: number;

  @IsNumber()
  registration_fee: number;

  @IsNumber()
  tax_fee: number;

  @IsNumber()
  car_loan_payment: number;

  @IsNumber()
  gps_installation: number;

}


