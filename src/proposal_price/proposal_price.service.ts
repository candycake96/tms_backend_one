import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProposalPriceAddDto, ProposalPriceEditDto } from './proposal_price.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProposalPriceService {
    constructor(private readonly db: DatabaseService) { }

    async postProposalPrice(
        proposalPriceAddDto: ProposalPriceAddDto,
    ): Promise<any> {
        const {
            Installments,
            average_speed,
            car_loan_payment,
            cargo_premium_amount,
            container_rest_time,
            costs_type_vehicle,
            destination_stop_time,
            driver_salary,
            gps_installation,
            heavy_duty_vehicle,
            interest_rate,
            lifespan,
            light_duty_vehicle,
            origin_stop_time,
            price_vehicle,
            purchase_month,
            registration_fee,
            residual_value,
            rest_time,
            tax_fee,
            tire_mileage_limit,
            tyre_count,
            tyre_price,
            vehicle_premium_amount,
            working_hours,
        } = proposalPriceAddDto;

        const query = `
  INSERT INTO vehicle_costs (
    Installments,
    average_speed,
    car_loan_payment,
    cargo_premium_amount,
    container_rest_time,
    costs_type_vehicle,
    destination_stop_time,
    driver_salary,
    gps_installation,
    heavy_duty_vehicle,
    interest_rate,
    lifespan,
    light_duty_vehicle,
    origin_stop_time,
    price_vehicle,
    purchase_month,
    registration_fee,
    residual_value,
    rest_time,
    tax_fee,
    tire_mileage_limit,
    tyre_count,
    tyre_price,
    vehicle_premium_amount,
    working_hours
  )
  OUTPUT INSERTED.costs_id
  VALUES (
    @Installments,
    @average_speed,
    @car_loan_payment,
    @cargo_premium_amount,
    @container_rest_time,
    @costs_type_vehicle,
    @destination_stop_time,
    @driver_salary,
    @gps_installation,
    @heavy_duty_vehicle,
    @interest_rate,
    @lifespan,
    @light_duty_vehicle,
    @origin_stop_time,
    @price_vehicle,
    @purchase_month,
    @registration_fee,
    @residual_value,
    @rest_time,
    @tax_fee,
    @tire_mileage_limit,
    @tyre_count,
    @tyre_price,
    @vehicle_premium_amount,
    @working_hours
  )
`;
        const params = {
            Installments: Installments,
            average_speed: average_speed,
            car_loan_payment: car_loan_payment,
            cargo_premium_amount: cargo_premium_amount,
            container_rest_time: container_rest_time,
            costs_type_vehicle: costs_type_vehicle,
            destination_stop_time: destination_stop_time,
            driver_salary: driver_salary,
            gps_installation: gps_installation,
            heavy_duty_vehicle: heavy_duty_vehicle,
            interest_rate: interest_rate,
            lifespan: lifespan,
            light_duty_vehicle: light_duty_vehicle,
            origin_stop_time: origin_stop_time,
            price_vehicle: price_vehicle,
            purchase_month: purchase_month,
            registration_fee: registration_fee,
            residual_value: residual_value,
            rest_time: rest_time,
            tax_fee: tax_fee,
            tire_mileage_limit: tire_mileage_limit,
            tyre_count: tyre_count,
            tyre_price: tyre_price,
            vehicle_premium_amount: vehicle_premium_amount,
            working_hours: working_hours,
        }
            ;

        console.log("QUERY:", query);
        console.log("PARAMS:", params);

        try {
            const result = await this.db.executeQuery<{ costs_id: number }>("access", query, params);
            return {
                message: 'success',
                insertId: result[0]?.costs_id ?? null
            };

        } catch (error) {
            console.error('Insert Error:', error);
            throw new InternalServerErrorException('Database Insert Failed');
        }

    }


    async getproposal() {
        try {
            const result = await this.db.executeQuery(
                "access",
                `SELECT * FROM vehicle_costs`
            );

            return {
                success: true,
                data: result,
            };
        } catch (error) {
            console.error("DB Error:", error);

            return {
                success: false,
                message: "ไม่สามารถดึงข้อมูลได้",
                error,
            };
        }
    }

    async postproposalUpdate(
        proposalPriceEditDto: ProposalPriceEditDto
    ): Promise<any> {
        const {
            costs_id,
            Installments,
            average_speed,
            car_loan_payment,
            cargo_premium_amount,
            container_rest_time,
            costs_type_vehicle,
            destination_stop_time,
            driver_salary,
            gps_installation,
            heavy_duty_vehicle,
            interest_rate,
            lifespan,
            light_duty_vehicle,
            origin_stop_time,
            price_vehicle,
            purchase_month,
            registration_fee,
            residual_value,
            rest_time,
            tax_fee,
            tire_mileage_limit,
            tyre_count,
            tyre_price,
            vehicle_premium_amount,
            working_hours,
        } = proposalPriceEditDto;


        const sqlQuery = `UPDATE vehicle_costs SET 
    Installments = @Installments,
    average_speed = @average_speed,
    car_loan_payment = @car_loan_payment,
    cargo_premium_amount = @cargo_premium_amount,
    container_rest_time = @container_rest_time,
    costs_type_vehicle = @costs_type_vehicle,
    destination_stop_time = @destination_stop_time,
    driver_salary = @driver_salary,
    gps_installation = @gps_installation,
    heavy_duty_vehicle = @heavy_duty_vehicle,
    interest_rate = @interest_rate,
    lifespan = @lifespan,
    light_duty_vehicle = @light_duty_vehicle,
    origin_stop_time = @origin_stop_time,
    price_vehicle = @price_vehicle,
    purchase_month = @purchase_month,
    registration_fee = @registration_fee,
    residual_value = @residual_value,
    rest_time = @rest_time,
    tax_fee = @tax_fee,
    tire_mileage_limit = @tire_mileage_limit,
    tyre_count = @tyre_count,
    tyre_price = @tyre_price,
    vehicle_premium_amount = @vehicle_premium_amount,
    working_hours = @working_hours
    WHERE costs_id = @costs_id
            `;
        const params = {
            costs_id: costs_id,
            Installments: Installments,
            average_speed: average_speed,
            car_loan_payment: car_loan_payment,
            cargo_premium_amount: cargo_premium_amount,
            container_rest_time: container_rest_time,
            costs_type_vehicle: costs_type_vehicle,
            destination_stop_time: destination_stop_time,
            driver_salary: driver_salary,
            gps_installation: gps_installation,
            heavy_duty_vehicle: heavy_duty_vehicle,
            interest_rate: interest_rate,
            lifespan: lifespan,
            light_duty_vehicle: light_duty_vehicle,
            origin_stop_time: origin_stop_time,
            price_vehicle: price_vehicle,
            purchase_month: purchase_month,
            registration_fee: registration_fee,
            residual_value: residual_value,
            rest_time: rest_time,
            tax_fee: tax_fee,
            tire_mileage_limit: tire_mileage_limit,
            tyre_count: tyre_count,
            tyre_price: tyre_price,
            vehicle_premium_amount: vehicle_premium_amount,
            working_hours: working_hours
        } ;
        try {
         console.log('params', params);
            const result = await this.db.executeQuery("access", sqlQuery, params);
         return {
                message: 'success',
            };

        } catch (error) {
            console.error('Update Error:', error);
            throw new InternalServerErrorException('Database Update Failed');
        }

    }


}
