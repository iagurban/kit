import { Badge, Box, Flex, Paper, Tooltip } from '@mantine/core';
import { sortBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import { hanumanFont } from 'src/fonts/hanuman';

import { gainBadgeColor } from '../editing/ratio2-d-graph';
import { aguDisplayFont, aguDisplayFontFallback } from '../fonts/agu-display';
import { artifikaFont } from '../fonts/artifika';
import { breeSerifFont } from '../fonts/bree-serif';
import { bungeeInlineFont, bungeeInlineFontFallback } from '../fonts/bungee-inline';
import { cherrySwashFont, cherrySwashFontFallback } from '../fonts/cherry-swash';
import { creteRoundFont } from '../fonts/crete-round';
import { enriquetaFont } from '../fonts/enriqueta';
import { geostarFont, geostarFontFallback } from '../fonts/geostar';
import { kumarOneOutlineFont, kumarOneOutlineFontFallback } from '../fonts/kumar-one-outline';
import { lustriaFont } from '../fonts/lustria';
import { monaspaceXenonFont } from '../fonts/monaspace-xenon';
import { notoNastaliqUrduFont } from '../fonts/noto-nastaliq-urdu';
import { notoSerifDevanagariFont } from '../fonts/noto-serif-devanagari';
import { portLligatSlabFont } from '../fonts/port-lligat-slab';
import { ribeyeMarrowFont, ribeyeMarrowFontFallback } from '../fonts/ribeye-marrow';
import { ryeFont, ryeFontFallback } from '../fonts/rye';
import { slabo27pxFont } from '../fonts/slabo-27px';
import { suwannaphumFont } from '../fonts/suwannaphum';
import { tourneyFont, tourneyFontFallback } from '../fonts/tourney';
import { Task } from '../graphql.generated/_types';
import { useStorage } from '../storage';
import { distanceTo00 } from '../utils/geometry';

const font = (name: string, fallback?: string) => `"${name}"` + (fallback ? `, ${fallback}` : '');

const fonts = {
  kumarOneOutline: font(kumarOneOutlineFont, kumarOneOutlineFontFallback),
  aguDisplay: font(aguDisplayFont, aguDisplayFontFallback),
  artifika: font(artifikaFont),
  bungeeInline: font(bungeeInlineFont, bungeeInlineFontFallback),
  cherrySwash: font(cherrySwashFont, cherrySwashFontFallback),
  hanuman: font(hanumanFont),
  geostar: font(geostarFont, geostarFontFallback),
  ribeyeMarrow: font(ribeyeMarrowFont, ribeyeMarrowFontFallback),
  rye: font(ryeFont, ryeFontFallback),

  // serif
  notoNastaliqUrdu: font(notoNastaliqUrduFont),
  monaspaceXenon: font(monaspaceXenonFont),
  lustria: font(lustriaFont),
  breeSerif: font(breeSerifFont),
  notoSerifDevanagari: font(notoSerifDevanagariFont),
  portLligatSlab: font(portLligatSlabFont),
  slabo27px: font(slabo27pxFont),
  suwannaphum: font(suwannaphumFont),
  tourney: font(tourneyFont, tourneyFontFallback),

  // sans
  enriqueta: font(enriquetaFont),
  creteRound: font(creteRoundFont),
} as const;

const NumericBadge = observer<{
  value: number;
  label: string;
  withPercent?: boolean;
  withOverlap?: boolean;
}>(function NumericBadge({ value, label, withPercent, withOverlap }) {
  const valueStr = Math.round(value * 100) + '%';
  const fl = label[0].toLocaleUpperCase(`en-US`);
  return (
    <Tooltip label={`${fl}${label.slice(1)}${!withPercent ? `: ${valueStr}` : ''}`} withArrow>
      <Badge
        variant="light"
        color={gainBadgeColor(value)}
        autoContrast
        style={{ marginRight: withOverlap ? `-1rem` : undefined }}
      >
        <Flex display="inline">
          <Box
            display="inline"
            ff={
              //   fonts.breeSerif
              // fonts.artifika
              // fonts.cherrySwash
              // fonts.creteRound
              // fonts.kumarOneOutline
              fonts.portLligatSlab
              // fonts.ribeyeMarrow
              // fonts.slabo27px
              // fonts.tourney
            }
            fz="0.9rem"
          >
            {fl}
          </Box>
          {withPercent && ' ' + valueStr}
        </Flex>
      </Badge>
    </Tooltip>
  );
});

const Indicators = observer<{
  variant: `brief` | `formula`;
  data: Pick<Task, `ease` | `impact`>;
}>(function Indicators({ variant, data }) {
  return (
    <Flex align="center" gap={'0.2rem'}>
      {variant === `formula` ? (
        <>
          <NumericBadge value={data.impact} label="impact" withPercent />
          <Box>⊕</Box>
          <NumericBadge value={data.ease} label="ease" withPercent />
          <Box>=</Box>
          <NumericBadge value={distanceTo00(data.ease, data.impact)} label="gain" withPercent />
        </>
      ) : (
        <>
          <NumericBadge value={data.impact} label="impact" withOverlap />
          <NumericBadge value={data.ease} label="ease" withOverlap />
          <NumericBadge value={distanceTo00(data.ease, data.impact)} label="gain" withPercent />
        </>
      )}
    </Flex>
  );
});

export const TasksListView = observer(function TasksListView() {
  const storage = useStorage();

  return (
    <Flex direction="column">
      {sortBy([...storage.tasks.actualTasks.values()], t => t.orderKey).map(t => (
        <Flex key={t.id} direction="column" px={4} py={2}>
          <Paper p={8} withBorder onClick={() => storage.tasks.openTask(t.id)}>
            <Flex align="center">
              <Box flex="1 0 auto">{t.title}</Box>
              <Badge>
                {t.dueToDate} {t.dueToOffset}
              </Badge>
              <Indicators variant="brief" data={t} />
            </Flex>
          </Paper>
        </Flex>
      ))}
    </Flex>
  );
});
