import { Regex, type SomeCompanionConfigField } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export interface ModuleConfig {
	host: string
	port: number
	advancedOptions?: boolean
	bind?: string
	decimals?: number
	customTrackers?: boolean
	customTrackerList?: string
	customFeatures?: boolean
	usePos?: boolean
	useSpeed?: boolean
	useOri?: boolean
	useAccel?: boolean
	useTrgtPos?: boolean
	useValidity?: boolean
	useTimestamp?: boolean
	useTrackerTimeout?: boolean
	trackerTimeout?: number
}

export function GetConfigFields(self: ModuleInstance): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			label: 'Information',
			width: 12,
			value: 'This module will connect to a PosiStageNet (PSN) tracking server.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Multicast Address',
			width: 6,
			tooltip: '(default: 236.10.10.10)',
			regex: Regex.IP,
			default: '236.10.10.10',
		},
		{
			type: 'number',
			id: 'port',
			label: 'Multicast Port',
			width: 6,
			tooltip: '(default: 56565)',
			min: 1,
			max: 65535,
			default: 56565,
		},
		{
			type: 'checkbox',
			id: 'advancedOptions',
			label: 'Advanced Options',
			width: 12,
			default: false,
		},
		{
			type: 'dropdown',
			id: 'bind',
			label: 'Bind to specific IP',
			width: 6,
			choices: self.getLocalIPs(),
			allowCustom: true,
			tooltip:
				'Network interface used to join the multicast group. Default: Any interface (OS default, 0.0.0.0). Custom values must be IP addresses.',
			regex: Regex.IP,
			default: '0.0.0.0',
			isVisibleExpression: '$(options:advancedOptions)',
		},
		{
			type: 'number',
			id: 'decimals',
			label: 'Decimals:',
			width: 6,
			tooltip: 'The number of decimal places in the variables',
			default: 2,
			min: 0,
			max: 4,
			required: true,
			isVisibleExpression: '$(options:advancedOptions)',
		},
		{
			type: 'checkbox',
			id: 'useTrackerTimeout',
			label: 'Clear Validity when tracker data is stale',
			width: 6,
			default: false,
			tooltip:
				'If no data packet is received from a tracker within the timeout window, the validity variable will be cleared to an empty string.',
			isVisibleExpression: '$(options:advancedOptions)',
		},
		{
			type: 'number',
			id: 'trackerTimeout',
			label: 'Tracker data timeout (ms)',
			width: 6,
			default: 500,
			min: 20,
			max: 60000,
			tooltip:
				"How long (in milliseconds) without a data packet before a tracker's validity variable is considered stale and cleared.",
			isVisibleExpression: '$(options:advancedOptions) && $(options:useTrackerTimeout)',
		},
		{
			type: 'checkbox',
			id: 'customTrackers',
			label: 'Only show specific Tracker IDs',
			width: 4,
			default: false,
			isVisibleExpression: '$(options:advancedOptions)',
		},
		{
			type: 'static-text',
			id: 'blank',
			label: '',
			width: 6,
			value: '',
			isVisibleExpression: '!$(options:customTrackers)',
		},
		{
			type: 'textinput',
			id: 'customTrackerList',
			label: `Tracker IDs:`,
			width: 6,
			tooltip: `Show specific tracker or tracker range ("-1"=all trackers)(e.g. "0-5,34,100-130")`,
			default: '0-100',
			regex: '/^(([0-9]+(-[0-9]+){0,1}),{0,1}){1,}$/',
			isVisibleExpression: '$(options:customTrackers)',
		},
		{
			type: 'checkbox',
			id: 'customFeatures',
			label: 'Only use specific features of Trackers',
			width: 12,
			default: false,
			isVisibleExpression: '$(options:advancedOptions)',
		},

		{
			type: 'checkbox',
			id: 'usePos',
			label: 'Position',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
		{
			type: 'checkbox',
			id: 'useSpeed',
			label: 'Speed',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
		{
			type: 'checkbox',
			id: 'useOri',
			label: 'Orientation',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},

		{
			type: 'checkbox',
			id: 'useAccel',
			label: 'Acceleration',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
		{
			type: 'checkbox',
			id: 'useTrgtPos',
			label: 'Targetposition',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
		{
			type: 'checkbox',
			id: 'useTimestamp',
			label: 'Timestamp',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
		{
			type: 'checkbox',
			id: 'useValidity',
			label: 'Validity',
			width: 3,
			default: true,
			isVisibleExpression: '$(options:customFeatures)',
		},
	]
}
