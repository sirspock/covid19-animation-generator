
import { AnimationContext } from '../util/Types';
import AnimationGenerator from '../animation/AnimationGenerator';
import Layer from '../layers/Layer';
import BackgroundLayer from '../layers/BackgroundLayer';
import DateLayer from '../layers/DateLayer';
import ScaleLayer from '../layers/ScaleLayer';
import SeriesCirclesLayer from '../layers/SeriesCirclesLayer';
import SeriesLinesLayer from '../layers/SeriesLinesLayer';
import SeriesMarkersLayer from '../layers/SeriesMarkersLayer';
import TimeBarLayer from '../layers/TimeBarLayer';
import WatermarkLayer from '../layers/WatermarkLayer';
import SeriesLabelsLayer from '../layers/SeriesLabelsLayer';

export default class ImageGenerator
{
	public static async generate(context: AnimationContext)
	{
		const frameInfoGenerator = new AnimationGenerator(context);
		const layers: Layer[] = [
			// Background
			new BackgroundLayer(context),

			// Series
			new SeriesLinesLayer(context),
			new SeriesCirclesLayer(context),
			new SeriesLabelsLayer(context),

			// Scale and makers
			new ScaleLayer(context),
			new SeriesMarkersLayer(context),

			// Extra
			new DateLayer(context),
			new TimeBarLayer(context),
			new WatermarkLayer(context)
		];
		for (const frame of frameInfoGenerator.generate())
		{
			for (const layer of layers)
				await layer.draw(frame);

			await context.writer.save(frame.name || null);
		}
	}
}
