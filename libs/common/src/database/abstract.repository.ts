import { AbstractDocument } from "@app/common/database/abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
	protected abstract readonly logger: Logger;

	protected constructor(protected readonly model: Model<TDocument>) {
	}

	// Omit, because we don't provide id, when create document
	async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
		const createdDocument = new this.model({
			...document,
			_id: new Types.ObjectId()
		});

		// create object, make it json and cast to TDocument
		return (await createdDocument.save()).toJSON() as unknown as TDocument;
	}

	async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
		// by default mongoose return hydrated document with internal properties, we want to get rid of it (lean = true)
		const document = await this.model
			.findOne(filterQuery)
			.lean<TDocument>(true);

		if (!document) {
			this.logger.warn('Document was not found with filterQuery', filterQuery);
			throw new NotFoundException('Document was not found');
		}

		return document;
	}

	async findOneAndUpdate(
		filterQuery: FilterQuery<TDocument>,
		update: UpdateQuery<TDocument>
	): Promise<TDocument> {
		// by default mongoose return object before update, we want to get document after update, so we set new to true (new = true)
		const document = await this.model.findOneAndUpdate(filterQuery, update, {
			new: true
		}).lean<TDocument>(true);

		if (!document) {
			this.logger.warn('Document was not found with filterQuery', filterQuery);
			throw new NotFoundException('Document was not found');
		}

		return document;
	}

	async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
		return this.model.find(filterQuery).lean<TDocument[]>(true);
	}

	async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
		return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
	}
}
