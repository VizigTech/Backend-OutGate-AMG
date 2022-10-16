import { useCurrentRoute, useRoute } from '@rocket.chat/ui-contexts';
import React, { Suspense, ReactElement, useEffect, ReactNode } from 'react';

import PageSkeleton from '../../components/PageSkeleton';
import SettingsProvider from '../../providers/SettingsProvider';
import { useUpgradeTabParams } from '../hooks/useUpgradeTabParams';
import AdministrationLayout from './AdministrationLayout';

type AdministrationRouterProps = {
	children?: ReactNode;
};

const AdministrationRouter = ({ children }: AdministrationRouterProps): ReactElement => {
	const { tabType, trialEndDate, isLoading } = useUpgradeTabParams();
	const [routeName] = useCurrentRoute();
	const defaultRoute = useRoute('admin-info');

	useEffect(() => {
		if (isLoading || routeName !== 'admin-index') {
			return;
		}

		defaultRoute.replace();
	}, [defaultRoute, routeName, tabType, trialEndDate, isLoading]);

	return (
		<AdministrationLayout>
			<SettingsProvider privileged>
				{children ? <Suspense fallback={<PageSkeleton />}>{children}</Suspense> : <PageSkeleton />}
			</SettingsProvider>
		</AdministrationLayout>
	);
};

export default AdministrationRouter;
