import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
	@Prop()
	timestamp: Date;

	@Prop()
	startDate: Date;

	@Prop()
	endDate: Date;

	// for associations
	@Prop()
	userId: string;

	@Prop()
	invoiceId: string;
}

export const ReservationSchema =
	SchemaFactory.createForClass(ReservationDocument);
