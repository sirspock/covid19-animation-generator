import { PreProcessor, PreProcessorConfig, TimeSeries } from '../util/Types';
import SumPreProcessor from './SumPreProcessor';

const PREPROCESSORS: { [key: string]: PreProcessor } = {
	sum: SumPreProcessor.run
};

export default class PreProcessorLoader
{
	public static load(
		input: PreProcessorConfig | string | undefined,
		series: TimeSeries[]): TimeSeries[]
	{
		const config = PreProcessorLoader.getPreProcessorConfig(input);
		if (!config)
			return series;

		const preProcessor = PREPROCESSORS[config.name];
		if (!preProcessor)
			throw new Error(`Pre-processor not found: ${config.name}`);
		return preProcessor(series, config.parameters);
	}

	private static getPreProcessorConfig(input: PreProcessorConfig | string | undefined)
	{
		if (!input)
			return null;
		return typeof input === 'string' ?
			{ name: input, parameters: null } :
			input;
	}
}
